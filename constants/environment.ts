export type Environment = {
  api: {
    baseUrl: string;
  };

  chuck: {
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
  
};
const currentEnvironment = development;

export default currentEnvironment;
