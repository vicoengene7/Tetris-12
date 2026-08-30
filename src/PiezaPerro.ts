import { Pieza } from "./Pieza";

export class PiezaPerro extends Pieza {

constructor() {

    super([
        [
            [0, 1, 1],
            [1, 1, 0]
        ],

        [
            [1, 0],
            [1, 1],
            [0, 1]
        ]
    ]);

}

}
