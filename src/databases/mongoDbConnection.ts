import Config from '../environment/index';

/**
 * Give different map as per env exists in project
 */
export const dbConnection = {
    url: Config.MONGODB_URL,
    options: { authSource: 'admin' },
};
