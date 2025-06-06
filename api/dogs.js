import express from 'express';
import dogs from './dogs.json' with {type: 'json'};

const router = express.Router();

router.get('', async (req, res) => {
    const filter = req.query.filter ?? '';
    const page = Number.parseInt(req.query.page, 10);
    const pageSize = Number.parseInt(req.query.pageSize, 10);
    if (Number.isNaN(page)) {
        res.status(400).send(
            'page is a required parameter and must be an integer'
        );
        return;
    }
    if (page < 0) {
        res.status(400).send('page must be 0 or greater');
        return;
    }

    if (Number.isNaN(pageSize)) {
        res.status(400).send(
            'pageSize is a required parameter and must be an integer'
        );
        return;
    }
    if (pageSize < 1 || pageSize > 20) {
        res.status(400).send('pageSize must be an integer between 1 and 20');
        return;
    }

    if (filter != null && typeof filter !== 'string') {
        res.status(400).send('filter must be a string');
        return;
    }

    const lowerCaseFilter = filter?.toLowerCase() ?? '';
    if (lowerCaseFilter === 'error') {
        res.status(500).send('Something went wrong');
        return;
    }

    const items = dogs.filter(({breed, 'sub-breed': subBreed, name}) => {
        return (
            !lowerCaseFilter ||
            [breed, subBreed, name].some((value) =>
                value?.toLowerCase()?.includes(lowerCaseFilter)
            )
        );
    });

    const data = {
        total: items.length,
        page,
        pageSize,
        items: items.slice(page * pageSize, (page + 1) * pageSize),
    };
    if (filter) {
        data.filter = filter;
    }

    await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000));
    res.json(data);
});

export default router;
