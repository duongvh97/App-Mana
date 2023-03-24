import { useState } from "react";

export const useStateHook = <T extends any>(valueInit: string | null | any) => {
    const [value, setValue] = useState<T>(valueInit);
    return { value, setValue };
};
