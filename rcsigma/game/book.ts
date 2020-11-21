/*****************************************************************************
  * OPENING BOOK
  ****************************************************************************/
let book_file: DataView;
let book_size: number;
type entry_t = {
    key: bitboard_t;
    move: number;
    weight: number;
    n: number;
    learn: number;
}

function book_open(arrayBuffer: ArrayBufferLike) {
    book_file = new DataView(arrayBuffer);
    book_size = Math.floor(book_file.byteLength / 16);
    return book_file !== null;
}
function find_key(key: bitboard_t) {
    let left = 0, mid, right = book_size - 1;
    let entry: entry_t = {
        key: 0n,
        move: NO_MOVE,
        weight: 0,
        n: 0,
        learn: 0
    }
    while (left < right) {
        mid = Math.floor((left + right) / 2);
        read_entry(entry, mid);
        if (key <= entry.key) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    read_entry(entry, left);
    return (entry.key === key) ? left : book_size;
}
function read_entry(entry: entry_t, index: number) {
    let offset = index * 16;
    entry.key = book_file.getBigUint64(offset);
    entry.move = book_file.getUint16(offset + 8);
    entry.weight = book_file.getUint16(offset + 10);//use later in search
    entry.n = book_file.getUint32(offset + 12); // use later in search or eval
    entry.learn = book_file.getUint32(offset + 14); // use later in search or eval
}
function poly_to_smith(poly_move: number) {
    let smith = "";
    smith += String.fromCharCode('a'.charCodeAt(0) + ((poly_move >> 6) & 7));
    smith += String.fromCharCode('1'.charCodeAt(0) + ((poly_move >> 9) & 7));
    smith += String.fromCharCode('a'.charCodeAt(0) + ((poly_move >> 0) & 7));
    smith += String.fromCharCode('1'.charCodeAt(0) + ((poly_move >> 3) & 7));
    let promotion = (poly_move >> 12) & 7;
    if (promotion !== 0) {
        let pp = 'q';
        switch (promotion) {
            case 1: pp = 'n'; break;
            case 2: pp = 'b'; break;
            case 3: pp = 'r'; break;
        }
        smith += pp;
    }
    return smith;
}
function my_random(n: number) {
    return Math.floor(Math.random() * (n));
}
function book_move(board: board_t) {
    if (book_file !== null && book_size !== 0) {
        let best_move_poly = NO_MOVE;
        let best_score = 0;
        let entry: entry_t = {
            key: 0n,
            move: NO_MOVE,
            weight: 0,
            n: 0,
            learn: 0
        }
        for (let pos = find_key(board.current_polyglot_key); pos < book_size; pos++) {
            read_entry(entry, pos);
            if (entry.key !== board.current_polyglot_key) {
                break;
            }
            let score = entry.weight;
            best_score += score;
            if (my_random(best_score) < score) best_move_poly = entry.move;
        }
        if (best_move_poly !== NO_MOVE) {
            let smith_move = poly_to_smith(best_move_poly);
            let best_move = smith_to_move(smith_move, board);
            if (best_move !== NO_MOVE) {
                return best_move;
            }
        }
    }
    return NO_MOVE;
}

/*****************************************************************************
  * NOOB PROBE BOOK
****************************************************************************/
// https://www.chessdb.cn/cloudbookc_api_en.html
type noobprobe_t = {
    option: string;
    value: string;
}
interface noobprobe_callback { (arg: string): void }

function fetch_noob(action: string, params: noobprobe_t[], board: board_t, callback: noobprobe_callback) {
    //http://www.chessdb.cn/cdb.php?action=[ACTION]{&[OPTION1]=[VALUE1]...&[OPTIONn]=[VALUEn]}
    let fen = board_to_fen(board);
    let params_str = "";
    for (let param of params) {
        params_str += `&${param.option}=${param.value}`;
    }

    const url = `http://www.chessdb.cn/cdb.php?action=${action}${params_str}&board=${fen}`

    const Http = new XMLHttpRequest();
    Http.onreadystatechange = function () {
        if (Http.readyState == 4 && Http.status == 200) {
            callback(Http.responseText)
        }
    }
    Http.open("GET", url, true);
    Http.send(null);

}
