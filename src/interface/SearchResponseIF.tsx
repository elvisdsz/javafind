import { SearchResultIF } from "./SearchResultIF";

export interface SearchResponseIF {
    artifacts: Array<SearchResultIF>,
    totalResultCount: number
}