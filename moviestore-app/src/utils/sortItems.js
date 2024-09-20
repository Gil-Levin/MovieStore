export const sortItems = (items, sortConfig) => {
    return [...items].sort((a, b) => {
        const aValue = sortConfig.key === 'productId' ? parseInt(a[sortConfig.key]) : a[sortConfig.key];
        const bValue = sortConfig.key === 'productId' ? parseInt(b[sortConfig.key]) : b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
    });
};
