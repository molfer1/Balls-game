
function givenTileIsEmpty({x, y}: TilePosition) {
    const el: HTMLElement = document.getElementById(`id_x${x}_y${y}`);
    if (el)
        return !el.classList.contains('filled');
    return false;
}

export interface TilePosition {
    x: number
    y: number
}
export function findPath(start: TilePosition, destination: TilePosition): TilePosition[] {
    const openArray: PathFinderNode[] = [];
    const closedArray: PathFinderNode[] = [];
 
    class PathFinderNode implements TilePosition {
        public readonly cost: number;

        constructor(public readonly x: number, public readonly y: number) {
            this.cost = Math.abs(x - start.x) + Math.abs(y - start.y) + Math.abs(x - destination.x) + Math.abs(y - destination.y);
        }

        private _parent: PathFinderNode

        public get parent(): PathFinderNode {
            return this._parent;
        }
        public set parent(v: PathFinderNode) {
            this._parent = v;
        }
        lessThen(other: PathFinderNode): boolean {
            return this.cost < other.cost;
        }
    }
    openArray.push(new PathFinderNode(start.x, start.y));

    while (openArray.length > 0) {
        openArray.sort((a, b) => a.lessThen(b) ? -1 : 1)
        const first = openArray.shift();
        closedArray.push(first);
        if (first.x === destination.x && first.y === destination.y) {
            const tileList: TilePosition[] = [];
            tileList.push(first);
            let parent = first.parent;
            while (parent) {
                tileList.push(parent);
                parent = parent.parent;
            }
            return tileList;
        }
        const nearbyElements: PathFinderNode[] = [];
        nearbyElements.push(new PathFinderNode(first.x - 1, first.y));
        nearbyElements.push(new PathFinderNode(first.x, first.y - 1));
        nearbyElements.push(new PathFinderNode(first.x, first.y + 1));
        nearbyElements.push(new PathFinderNode(first.x + 1, first.y));
        for (const nearbyEl of nearbyElements) {
            if (!givenTileIsEmpty(nearbyEl)){continue;}
            if (openArray.find(el => el.x === nearbyEl.x && el.y === nearbyEl.y)){continue;}
            if (closedArray.find(el => el.x === nearbyEl.x && el.y === nearbyEl.y)){continue;}
            nearbyEl.parent = first;
            openArray.push(nearbyEl);
        }
    }
    return [];
}
