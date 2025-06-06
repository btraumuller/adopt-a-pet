import express from 'express';
import dogs from './dogs.json' with {type: 'json'};

vi.mock('express', () => ({
    default: {
        Router: vi.fn(),
    },
}));

class MockRouter {
    get = vi.fn();
}

describe('api/dogs.js', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });
    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    const setup = async (query = {}) => {
        const api = (await import('./dogs.js')).default;
        const get = api.get.mock.calls[0][1];

        const req = {
            query: {
                page: 0,
                pageSize: 5,
                ...query,
            },
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn(),
            json: vi.fn(),
        };

        get(req, res);

        return {api, get, req, res};
    };

    beforeEach(async () => {
        express.Router.mockImplementation(() => new MockRouter());
    });

    afterEach(() => {
        vi.resetModules();
    });

    it('should export a router', async () => {
        const {api} = await setup();
        expect(api).toBeInstanceOf(MockRouter);
        expect(api.get).toHaveBeenCalledWith('', expect.any(Function));
    });

    it('returns json', async () => {
        const {res} = await setup();
        await vi.runOnlyPendingTimers();
        expect(res.json).toHaveBeenCalledWith({
            total: dogs.length,
            page: 0,
            pageSize: 5,
            items: dogs.slice(0, 5),
        });
    });

    it.each([
        ['not a number', 'a'],
        ['less than 0', '-1'],
    ])('should return a 400 if page is %s', async (_, page) => {
        const {res} = await setup({page});
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith(
            expect.stringMatching(/page.*must be/)
        );
    });

    it.each([
        ['not a number', 'a'],
        ['less than 0', '-1'],
        ['greater than 20', '21'],
    ])('should return a 400 if pageSize is %s', async (_, pageSize) => {
        const {res} = await setup({pageSize});
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith(
            expect.stringMatching(/pageSize.*must be/)
        );
    });

    it('should return a 400 if filter is not a string', async () => {
        const {res} = await setup({filter: []});
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith(
            expect.stringMatching(/filter.*must be/)
        );
    });

    it('filters', async () => {
        const stellas = dogs.filter(({name}) => name === 'Stella');
        const {res} = await setup({filter: 'Stella'});
        await vi.runOnlyPendingTimers();

        // There are two dogs named Stella in the json
        expect(res.json).toHaveBeenCalledWith({
            total: stellas.length,
            filter: 'Stella',
            page: 0,
            pageSize: 5,
            items: dogs.filter(({name}) => name === 'Stella'),
        });
    });

    it('pages', async () => {
        const {res} = await setup({page: 1, pageSize: 2});
        await vi.runOnlyPendingTimers();
        expect(res.json).toHaveBeenCalledWith({
            total: dogs.length,
            page: 1,
            pageSize: 2,
            items: [dogs[2], dogs[3]],
        });
    });

    it('throws when the filter term is "error"', async () => {
        const {res} = await setup({filter: 'error'});
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Something went wrong');
    });
});
