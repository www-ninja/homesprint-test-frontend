import axios from "axios"
import { IBook } from "../models/IBook"
import { API_URL } from "../constant"

export interface IResponseType {
    books: IBook[];
    totalCount: number;
    error: string;
}

export const getBookList = async (keyword: string, startIndex: number): Promise<IResponseType> => {
    let books = [], totalCount = 0, error = '';
    try {
        const response = await axios.get(`${API_URL}/books?keyword=${keyword}&startIndex=${startIndex}`);
        if (response.data) {
            books = response.data.items;
            totalCount = response.data.totalItems
        }
    } catch (err: any) {
        error = err.message
    }
    return { books, totalCount, error }
}