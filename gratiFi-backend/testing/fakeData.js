const Tipper = require('../models/tipper.model');
const Creator = require('../models/creator.model');

const fakeData = {
  creator: [
    {
      name: 'Emily Stone',
      walletAddress: '0xFc5B72A244Fc40F207BBF8b7aD459Bb4c930AB80',
      balance: 100.0,
      socialLinks: {
        twitter: 'https://twitter.com/EmilyStone',
        instagram: 'https://instagram.com/EmilyStone',
        youtube: 'https://youtube.com/EmilyStone',
      },
      description:
        'Emily is a tech enthusiast and content creator with a passion for AI.',
      stats: {
        audienceReached: 50000,
        totalFollowers: 15000,
      },
    },
    {
      name: 'David Lee',
      walletAddress: '0x28D9a2C9d28A29aF9e3D1a44dF13a90814e62599',
      balance: 50.0,
      socialLinks: {
        twitter: 'https://twitter.com/DavidLee',
        instagram: 'https://instagram.com/DavidLee',
        other: 'https://www.davidlee.com',
      },
      description: 'David creates educational content for aspiring developers.',
      stats: {
        audienceReached: 30000,
        totalFollowers: 8000,
      },
    },
    {
      name: 'Sophie Green',
      walletAddress: '0x92A547Ad82C1f90a538ab14c552DBd6b23BC56c0',
      balance: 200.0,
      socialLinks: {
        twitter: 'https://twitter.com/SophieGreen',
        instagram: 'https://instagram.com/SophieGreen',
      },
      description:
        'Sophie is a lifestyle influencer with a focus on sustainable living.',
      stats: {
        audienceReached: 100000,
        totalFollowers: 22000,
      },
    },
  ],
  tipper: [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      walletAddress: '0xDf42F2b32D5a8B82F26f8c5A8D0a47fD8D8C4F9D',
      balance: 5.0,
      transactions: [
        {
          creatorWallet: '0xFc5B72A244Fc40F207BBF8b7aD459Bb4c930AB80',
          amount: 1.0,
          transactionHash: '0x123abc456def',
          date: '2025-01-20T00:00:00.000Z',
        },
      ],
    },
    {
      name: 'Alice Smith',
      email: 'alice.smith@example.com',
      walletAddress: '0x4c5FfeE0f7B4Dca2b09A6b31A929F07D6EBAa81F',
      balance: 3.5,
      transactions: [
        {
          creatorWallet: '0x28D9a2C9d28A29aF9e3D1a44dF13a90814e62599',
          amount: 2.0,
          transactionHash: '0x789ghi012jkl',
          date: '2025-01-22T00:00:00.000Z',
        },
      ],
    },
    {
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      walletAddress: '0xa3bBdCF0d054e457d7D24451714c8E91c2dB51fD',
      balance: 10.0,
      transactions: [],
    },
  ],
};

Tipper.insertMany(fakeData.tipper.slice(0, 1))  // Insert one tipper document
  .then(() => console.log('Tipper data inserted successfully!'))
  .catch(err => console.error('Error inserting tipper data:', err));

Creator.insertMany(fakeData.creator.slice(0, 1))  // Insert one creator document
  .then(() => console.log('Creator data inserted successfully!'))
  .catch(err => console.error('Error inserting creator data:', err));

