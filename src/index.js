fetch('/api/dogs?page=0&pageSize=10')
    .then((res) => res.json())
    .then(({items: dogs}) => {
        dogs.forEach(({image, name}) => {
            const img = document.createElement('img');
            img.src = `images/${image}`;
            img.setAttribute('alt', `${name}`);
            document.body.appendChild(img);
        });
    });
