export type Environment = {
  api: {
    baseUrl: string;
  };

  chuck: {
    baseUrl: string;
  };

  emoji: {
    baseUrl: string;
  };
};

const development: Environment = {
  api: {
    baseUrl: 'https://randomuser.me/api',
  },

  chuck: {
    baseUrl: 'https://api.chucknorris.io/jokes/random',
  },

  emoji: {
    baseUrl: 'https://api.ritekit.com/v1/emoji/auto-emojify',
  },
  
};
const currentEnvironment = development;

export default currentEnvironment;
