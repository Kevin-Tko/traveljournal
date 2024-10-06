import { useSearchParams } from "react-router-dom";

export function useUrlLocation() {
    const [searchParams] = useSearchParams();
    const maplat = searchParams.get("lat");
    const maplng = searchParams.get("lng");

    return [maplat, maplng];
}
