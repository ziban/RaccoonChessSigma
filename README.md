[![Build Status](https://travis-ci.org/medegw01/raccoon.js.svg?branch=master)](https://travis-ci.org/medegw01/raccoon.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/medegw01/RaccoonChessSigma/blob/main/LICENSE)

# RaccoonChessSigma
<p align="center">
  <img width="200" src="https://github.com/aerogear/graphback/raw/master/website/static/img/logo.png">
  <br/> 
  ♔ ♕ ♖ ♗ ♘ ♙<br/>
  TypeScript Chess Library and Engine
</p>

[RaccoonChessSigma](httSp://rcsigma.org/) is a free, powerful chess engine written in TypeScript. It is primarily inspired by [Vice](https://www.youtube.com/watch?v=bGAfaepBco4&list=PLZ1QII7yudbc-Ky058TEaOstZHVbT-2hg), [Stockfish](https://stockfishchess.org/), [LeelaChessZero](https://lczero.org/), and a number of open source projects and aims to serve as both reference for other authors and a high-end engine.

RaccoonChessSigma evaluates chess positions using either of the following two types of functions:
* [raccoon](./rcsigma/evaluate/rc/rc.md): uses  the classical evaluation based on handcrafted terms. It runs efficiently on most CPU architecture
* [raccoonZero](./rcsigma/evaluate/rc0/rc0.md): uses a deep convolutional neural network(NN)

By following the [Getting Started Guide](./docs/getting_started_guide.md), a user can utilize either of the engines as a [UCI-compliant Chess Engine](./rcsigma/ui/uci/uci.md) or as an extensive [JavaScript Chess Library](./rcsigma/ui/api/api.md).  

## Table of Contents
- [Code of Conduct](./docs/code_of_conduct.md)
- Guides
  - [Maintainers Guide](./docs/maintainers.md)
  - [Contributing Guide](./docs/contributing.md)
  - [Getting Started Guide](./docs/getting_started_guide.md)
- [Development](#development)
- [Architecture](./docs/architecture.md)
- [About](#about) 

## Development
TODO

## Architecture
TODO

## About
TODO
