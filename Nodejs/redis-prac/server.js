const client = require('./client');
const logger = require('./winston');

const setfunc = async function setString(key, value) {
    try {
        await client.lpush(key, value);
        logger.info(`Set key "${key}" with value "${value} length"`);
    } catch (err) {
        logger.error(`Failed to set key "${key}": ${err.message}`);
        throw err;
    }
};

// const getfunc = async function getString(key) {
//     try {
//         const value = await client.lpop(key);
//         if (value === null) {
//             logger.warn(`No value found for key "${key}" (list empty)`);
//             return null;
//         }
//         logger.info(`Got value "${value}" for key "${key}"`);
//         return value;
//     } catch (err) {
//         logger.error(`Failed to get key "${key}": ${err.message}`);
//         throw err;
//     }
// };

async function main() {
    try {
        await setfunc('username', 'john_doe');
        // await getfunc('username');
        // await getfunc('username'); // second call will log warning instead of silent null
    } catch (err) {
        logger.error(`Unexpected error: ${err.message}`);
    } finally {
        client.quit();
        logger.info("Redis connection closed.");
    }
}

main();
