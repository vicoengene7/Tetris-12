import { Pieza } from "./Pieza";

export class PiezaPalo extends Pieza {

    constructor() {
        super([
            [
                [1, 1, 1, 1]
            ],

            [
                [1],
                [1],
                [1],
                [1]
            ]
        ]);
    }
}