export class QuickUnionUF {
    ids: number[]

    constructor(N: number) {
        // this.ids = Array.from(Array(N).keys())
        this.ids = []

        for (let i = 0; i < N; i++) {
            this.ids.push(i)
        }
    }

    root(i: number) {
        let id = this.ids[i];

        while (id !== this.ids[id]) {
            id = this.ids[id]
        }

        return id;
    }

    connected(p: number, q: number): boolean {
        let idP = this.root(p)
        let idQ = this.root(q)

        return idQ === idP
    }

    union(p: number, q: number) {
        let i = this.root(p);
        let j = this.root(q);
        this.ids[i] = j;
    }
}