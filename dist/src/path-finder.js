function givenTileIsEmpty({ x, y }) {
    const el = document.getElementById(`id_x${x}_y${y}`);
    if (el)
        return !el.classList.contains('filled');
    return false;
}
export function findPath(start, destination) {
    const openArray = [];
    const closedArray = [];
    class PathFinderNode {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.cost = Math.abs(x - start.x) + Math.abs(y - start.y) + Math.abs(x - destination.x) + Math.abs(y - destination.y);
        }
        get parent() {
            return this._parent;
        }
        set parent(v) {
            this._parent = v;
        }
        lessThen(other) {
            return this.cost < other.cost;
        }
    }
    openArray.push(new PathFinderNode(start.x, start.y));
    while (openArray.length > 0) {
        openArray.sort((a, b) => a.lessThen(b) ? -1 : 1);
        const first = openArray.shift();
        closedArray.push(first);
        if (first.x === destination.x && first.y === destination.y) {
            const tileList = [];
            tileList.push(first);
            let parent = first.parent;
            while (parent) {
                tileList.push(parent);
                parent = parent.parent;
            }
            return tileList;
        }
        const nearbyElements = [];
        nearbyElements.push(new PathFinderNode(first.x - 1, first.y));
        nearbyElements.push(new PathFinderNode(first.x, first.y - 1));
        nearbyElements.push(new PathFinderNode(first.x, first.y + 1));
        nearbyElements.push(new PathFinderNode(first.x + 1, first.y));
        for (const nearbyEl of nearbyElements) {
            if (!givenTileIsEmpty(nearbyEl)) {
                continue;
            }
            if (openArray.find(el => el.x === nearbyEl.x && el.y === nearbyEl.y)) {
                continue;
            }
            if (closedArray.find(el => el.x === nearbyEl.x && el.y === nearbyEl.y)) {
                continue;
            }
            nearbyEl.parent = first;
            openArray.push(nearbyEl);
        }
    }
    return [];
}
