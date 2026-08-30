export class Reloj {

    private _ticks: number = 0;

    tick(): void {
        this._ticks++;
    }

    get _tomarTicks(): number {
        return this._ticks;
    }
}

