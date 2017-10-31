export const LOCATIONS = [
    {
        id: 0,
        name: 'Bellevue College',
        location: {lat: 47.585224, lng: -122.148861}
    },
    {
        id: 1,
        name: 'Seattle',
        location: {lat: 47.6062, lng: -122.3321}
    }
];

export const LISTS = [
    {
        location: 0,
        data: [
            {
                id: '0',
                title: 'One',
                body: 'Hats are nice'
            }, {
                id: '1',
                title: 'One',
                body: 'Hats are nice'
            },
            {
                id: '2',
                title: 'Two',
                body: 'Hats are nice'
            }
        ]
    },
    {
        location: 1,
        data: [
            {
                id: '0',
                title: 'One',
                body: 'Hats are nice'
            }, {
                id: '2',
                title: 'One',
                body: 'Hats are nice'
            },
            {
                id: '3',
                title: 'Two',
                body: 'Hats are nice'
            }
        ]
    }
];

export default function fakeJoin({listItem, locations}) {

    let locationData = null;
    locations.forEach(l => {
        console.log(l.id, listItem.location);
        if (l.id === listItem.location) {
            locationData = l;
        }
    });
    listItem.location = locationData;
    return listItem;

}