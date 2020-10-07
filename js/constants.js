'use strict';

/**Constantes para Coleres, Columnas, Filas Y TAmaño del Bloque*/
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const LINES_PER_LEVEL = 10;
/**Para Generar las Piezas */
const SHAPES = [
    [],
    //I 
    [
        [0, 0, 0, 0], 
        [1, 1, 1, 1], 
        [0, 0, 0, 0], 
        [0, 0, 0, 0]
    ],
    //J
    [
        [2, 0, 0], 
        [2, 2, 2], 
        [0, 0, 0]
    ],
    //L
    [
        [0, 0, 3], 
        [3, 3, 3], 
        [0, 0, 0]
    ],
    //Cuadrado
    [
        [4, 4], 
        [4, 4]
    ],
    //S
    [
        [0, 5, 5], 
        [5, 5, 0], 
        [0, 0, 0]
    ],
    // T
    [
        [0, 6, 0], 
        [6, 6, 6], 
        [0, 0, 0]
    ],
    //Z
    [
        [7, 7, 0], 
        [0, 7, 7], 
        [0, 0, 0]
    ]
];
/**Para Hacerlo inmutables */
Object.freeze(SHAPES);
/**Constantes para los Colores */
const COLORS = [
    'none',
    'gray',
    'blue',
    'orange',
    'yellow',
    'DarkGreen',
    'purple',
    'red'
];
/**Para Hacerlo inmutables */
Object.freeze(COLORS);
/**Constante para Código de las Teclas */
const KEY = {
    ESC: 27,
    SPACE: 32,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    P: 80
}
/**Para Hacerlo inmutables */
Object.freeze(KEY);
/**Constante para los Puntos */
const POINTS = {
    SINGLE: 100,
    DOUBLE: 300,
    TRIPLE: 500,
    TETRIS: 800,
    SOFT_DROP: 1,
    HARD_DROP: 2,
}
/**Para Hacerlo inmutables */
Object.freeze(POINTS);
/**Constante para los Niveles */
const LEVEL = {
    0: 800,
    1: 720,
    2: 630,
    3: 550,
    4: 470,
    5: 380,
    6: 300,
    7: 220,
    8: 130,
    9: 100,
    10: 80,
    11: 80,
    12: 80,
    13: 70,
    14: 70,
    15: 70,
    16: 50,
    17: 50,
    18: 50,
    19: 30,
    20: 30,
}
/**Para Hacerlo inmutables */
Object.freeze(LEVEL);