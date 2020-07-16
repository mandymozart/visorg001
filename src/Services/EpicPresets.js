export const epics = [
    {
        id: 'planning-a-show',
        title: 'Preplanned items for planning the show planning.',
        descripton: '',
        issues: [
            {
                id: '1',
                title: 'Test 1',
                required: true,
                description: `
                # User Story
                Jo

                # Acceptance criteria

                * [ ] SDFKJSDKF
                /label ~VISSTS ~Role: Handy Person
                `,
            },
            {
                id: '2',
                title: 'Test 2',
                required: false,
                description: `
                # User Story
                Jo

                # Acceptance criteria

                * [ ] SDFKJSDKF
                /lable ~VISSTS ~Role: Handy Person
                `,
            }, {
                id: '3',
                title: 'Test 3',
                required: false,
                description: `
                # User Story
                Jo

                # Acceptance criteria

                * [ ] SDFKJSDKF
                /lable ~VISSTS ~Role: Handy Person
                `,
            }
        ]
    },
    {
        id: 'planning-a-concert',
        title: 'Pre-Planning of a planning of a concert planning',
        description: '',
        issues: [
            {
                id: '4',
                title: 'Geht',
                description: '',
                required: true,
            },
        ],
    },
];