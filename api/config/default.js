var defaultValues = {
  admin: {
    userName: 'admin',
    displayName: 'Admin'
  },
  dashboard: [
    {
      value: 'female',
      title: 'Female',
      property: 'gender'
    },
    {
      value: 'male',
      title: 'Male',
      property: 'gender'
    },
    {
      value: 'kid',
      title: 'Kids',
      property: 'gender'
    },
    {
      value: true,
      title: 'International',
      property: 'international'
    }
  ],
  enums: {
    gender: [
      {
        id: 'kid',
        name: 'Kid'
      },
      {
        id: 'male',
        name: 'Male'
      },
      {
        id: 'female',
        name: 'Female'
      }
    ],
    agents: [
      {
        id: 'admin',
        name: 'Admin Admin',
        phone: '098 09887 09887',
        email: 'admin@admin.com'
      },
      {
        id: 'admin',
        name: 'Admin Admin',
        phone: '098 09887 09887',
        email: 'admin@admin.com'
      }
    ],
    appearance: [
      {
        id: 'ee',
        name: 'Eastern European'
      },
      {
        id: 'w',
        name: 'White'
      },
      {
        id: 'm',
        name: 'Mediterranean'
      }
    ]
  }
};

module.exports = defaultValues;