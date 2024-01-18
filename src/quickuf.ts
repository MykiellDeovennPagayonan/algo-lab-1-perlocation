export class QuickUnionUF {
    ids: number[]
    size: number[]

    constructor(N: number) {
        // this.ids = Array.from(Array(N).keys())
        this.ids = []
        this.size = []

        for (let i = 0; i < N; i++) {
            this.ids.push(i)
            this.size.push(1)
        }
    }

    root(i: number) : number {
        let id = this.ids[i];

        while (id !== this.ids[id]) {
            this.ids[i] = this.ids[this.ids[i]]
            id = this.ids[id]
        }

        return id;
    }

    connected(p: number, q: number): boolean {
        return this.root(p) === this.root(q)
    }

    union(p: number, q: number) {
        let i = this.root(p);
        let j = this.root(q);

        if (i === j) {
            return
        }

        if (this.size[i] < this.size[j]) {
            this.ids[i] = j
            this.size[j] += this.size[i];
        } else {
            this.ids[j] = i
            this.size[i] += this.size[j]; 
        }
    }
}