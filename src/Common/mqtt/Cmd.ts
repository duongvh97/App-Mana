import { isUndefined } from "lodash";

export class Cmd {
    static cmdControl = (r: number, g: number, b: number, w: number, uv: number, P: number = 1, y?: number, v?: number, db?: number) => {
        let cmd: any = {
            "control": { "R": r, "G": g, "B": b, "W": w, "UV": uv, "P": P }
        };

        console.log("cmdControl ------------------------", y);
        if (y != null && !isUndefined(y)) {
            cmd.control.Y = y;
        }
        if (v != null && !isUndefined(v)) {
            cmd.control.V = v;
        }
        if (db != null && !isUndefined(db)) {
            cmd.control.DB = db;
        }

        return cmd;
    };
    static objRGB = (r: number, g: number, b: number, w: number, uv: number, P: number = 1, y?: number, v?: number, db?: number) => {
        let cmd: any = { "R": r, "G": g, "B": b, "W": w, "UV": uv, "P": P };
        if (y != null && !isUndefined(y) && !isNaN(y)) {
            cmd.Y = y;
        }
        if (v != null && !isUndefined(v) && !isNaN(v)) {
            cmd.V = v;
        }
        if (db != null && !isUndefined(db) && !isNaN(db)) {
            cmd.DB = db;
        }

        return cmd;
    };

    static cmdAddAlarm = (param: any) => {
        return {
            "timer": {
                "cmd": "add",
                "param": param
            }
        };
    };

    static cmdGetAlarm = () => {
        return {
            "timer": {
                "cmd": "get"
            }
        };
    };

    static cmdUpdateTimer = (id: number, param: any) => {
        return {
            "timer": {
                "cmd": "update",
                "id": id,
                "param": param
            }
        };
    };

    static cmdRemoveTimer = (id: number) => {
        return {
            "timer": {
                "cmd": "delete",
                "id": id
            }
        };
    };

    /**
     *
     * @param x {number} 0 : reset default, 1 : reset factory
     */
    static cmdReset = (x: 0 | 1) => {
        return { "reset": x };
    };
}
