export const epics = [
    {
        id: 'planning-a-show',
        title: 'Show Planning',
        description: 'Preplanned items for planning the show planning.',
        issues: [
            {
                id: '38ushdj',
                title: 'Test 1',
                required: true,
                selected: true,
                description: `# User Story
Jo

# Acceptance criteria

/label ~VISSTS ~Role: Handy Person
                `,
            },
            {
                id: '382shdj',
                title: 'Ein Langer Titel mit grosser Bedeutung',
                required: true,
                selected: true,
                description: `# User Story
Jo

# Acceptance criteria

* [ ] SDFKJSDKF
* [ ] SDFKJSDKF
* [ ] SDFKJSDKF
* [ ] SDFKJSDKF
* [ ] SDFKJSDKF
/label ~VISSTS ~Role: Handy Person
                `,
            },
            {
                id: '23hgsgj',
                title: 'Test 2',
                required: false,
                selected: true,
                description: `# User Story
Jo

# Acceptance criteria

* [ ] SDFKJSDKF
/lable ~VISSTS ~Role: Handy Person
                `,
            }, {
                id: '234uhufh',
                title: 'Pre-Planning of a planning of a concert planning',
                required: false,
                selected: false,
                description: `# User Story
Jo

# Acceptance criteria

* [ ] SDFKJSDKF
/label ~VISSTS ~"Role: Handy Person" ~"VISEXT002"
                `,
            }
        ]
    },
    {
        id: 'planning-a-concert',
        title: 'Conert Planning',
        description: 'Pre-Planning of a planning of a concert planning',
        issues: [
            {
                id: '4',
                title: 'Geht',
                description: 'What the fuck',
                required: true,
                selected: true,
            },
        ],
    },
];
