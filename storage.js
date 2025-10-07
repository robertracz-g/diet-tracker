// TODO: Implement a storage abstraction layer
// The layer should support swappable implementations, starting with local storage.
// All operations should be async.

const storage = {
    // TODO: Implement a function to export data to CSV or PDF.
    async save(key, data) {
        return new Promise((resolve) => {
            localStorage.setItem(key, JSON.stringify(data));
            resolve();
        });
    },
    async get(key) {
        return new Promise((resolve) => {
            const data = localStorage.getItem(key);
            resolve(JSON.parse(data));
        });
    }
};
