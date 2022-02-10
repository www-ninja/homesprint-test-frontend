import axios from "axios";
import { getBookList } from './book';

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;


describe('book api service', () => {
    test(`should return book list`, async () => {

        const mockData = {
            items: [{
                kind: "kind",
                id: "id",
                etag: "etag",
                selfLink: "self-link",
            }],
            totalItems: 1
        }

        mockedAxios.get.mockResolvedValue({
            data: mockData
        });

        const { books, totalCount, error } = await getBookList("test", 0);
        expect(books.length).toBe(mockData.items.length);
        expect(totalCount).toBe(mockData.totalItems);
        expect(error).toBe('');
    });

    test(`should return error`, async () => {
        const mockData = {
            status: 500,
            message: 'problem'
        }

        mockedAxios.get.mockRejectedValue(mockData);

        const { books, totalCount, error } = await getBookList("test", 0);
        expect(books.length).toBe(0);
        expect(totalCount).toBe(0);
        expect(error).toBe(mockData.message);
    });
})