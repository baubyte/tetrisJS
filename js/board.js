/**Clase para el Tablero */
class Board {
    ctx;
    ctxNext;
    grid;
    piece;
    next;
    requestId;
    time;

    /**Constructor */
    constructor(ctx, ctxNext) {
        this.ctx = ctx;
        this.ctxNext = ctxNext;
        this.init();
    }
    /**Iniciamos el Tablero */
    init() {
        // tamaño del Canvas a partir de constantes.
        this.ctx.canvas.width = COLS * BLOCK_SIZE;
        this.ctx.canvas.height = ROWS * BLOCK_SIZE;

        // para que no necesitemos dar tamaño en cada dibujo.
        this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
    }
    /**Reseteamos el Tablero para un Nuevo Juego */
    reset() {
        this.grid = this.getEmptyGrid();
        this.piece = new Piece(this.ctx);
        this.piece.setStartingPosition();
        this.getNewPiece();
    }
    /**Obtenemos una Nueva  Pieza o Tetromino */
    getNewPiece() {
        this.next = new Piece(this.ctxNext);
        this.ctxNext.clearRect(
            0,
            0,
            this.ctxNext.canvas.width,
            this.ctxNext.canvas.height
        );
        this.next.draw();
    }
    /**Dibujamos le Tablero y las Piezas */
    draw() {
        this.piece.draw();
        this.drawBoard();
    }
    /**Limpias Cuando Hacemos Puntos */
    drop() {
        let p = moves[KEY.DOWN](this.piece);
        if (this.valid(p)) {
            this.piece.move(p);
        } else {
            this.freeze();
            this.clearLines();
            if (this.piece.y === 0) {
                // Game over
                return false;
            }
            this.piece = this.next;
            this.piece.ctx = this.ctx;
            this.piece.setStartingPosition();
            this.getNewPiece();
        }
        return true;
    }
    /**Obtenemos un Array con Ceros */
    getEmptyBoard() {
        return Array.from(
            { length: ROWS }, () => Array(COLS).fill(0)
        );
    }
    /**Para que no se Pueda Salir del Tablero */
    valid(p) {
        return p.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = p.x + dx;
                let y = p.y + dy;
                return (
                    value === 0 ||
                    (this.insideWalls(x) && this.aboveFloor(y) && this.notOccupied(x, y))
                );
            });
        });
    }
    /**Para Rotar las Piezas */
    rotate(piece) {
        /**Clonar con JSON para inmutabilidad.*/
        let p = JSON.parse(JSON.stringify(piece));

        // Trasponemos el Array
        for (let y = 0; y < p.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
            }
        }

        /**Ivertimos el Orden de las Columnas*/
        p.shape.forEach(row => row.reverse());
        return p;
    }
    /**Para cuando la pieza no puede bajar mas la congelamos y la hacemos parte del tablero */
    freeze() {
        this.piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.grid[y + this.piece.y][x + this.piece.x] = value;
                }
            });
        });
    }
    /**Para Dibujar tablero */
    drawBoard() {
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillStyle = COLORS[value];
                    this.ctx.fillRect(x, y, 1, 1);
                }
            });
        });
    }
    /**Para Obtener el Tablero Limpio */
    getEmptyGrid() {
        return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    }
    insideWalls(x) {
        return x >= 0 && x < COLS;
    }

    aboveFloor(y) {
        return y <= ROWS;
    }

    notOccupied(x, y) {
        return this.grid[y] && this.grid[y][x] === 0;
    }

    /**Para limpiar las Lineas */
    clearLines() {
        let lines = 0;

        this.grid.forEach((row, y) => {

            // Si cada valor es mayor a 0.
            if (row.every(value => value > 0)) {
                lines++;

                // Eliminamos la Linea
                this.grid.splice(y, 1);

                //Una fila llena de cero en la parte superior.
                this.grid.unshift(Array(COLS).fill(0));
            }
        });

        if (lines > 0) {
            //Puntos a partir de líneas despejadas y niveles.

            account.score += this.getLinesClearedPoints(lines);
            account.lines += lines;

            // Si llegamos a las líneas para el siguiente nivel
            if (account.lines >= LINES_PER_LEVEL) {
                // Goto next level
                account.level++;

                //Elimina las líneas para que comencemos sumar para el siguiente nivel.
                account.lines -= LINES_PER_LEVEL;

                // Aumenta la velocidad del juego
                time.level = LEVEL[account.level];
            }
        }
    }
    /**Para obtener los puntos de acuerdo a las cantidad de lineas */
    getLinesClearedPoints(lines, level) {
        const lineClearPoints =
            lines === 1
                ? POINTS.SINGLE
                : lines === 2
                    ? POINTS.DOUBLE
                    : lines === 3
                        ? POINTS.TRIPLE
                        : lines === 4
                            ? POINTS.TETRIS
                            : 0;

        return (account.level + 1) * lineClearPoints;
    }
}