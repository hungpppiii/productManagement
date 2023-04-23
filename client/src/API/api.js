import axios from 'axios';

const getAllProductLineAPI = async () => {
    const res = await axios.get(
        'http://localhost:8080/api/productLine/getAllProductLine', {
            withCredentials: true,
        }
    );
    return res.data;
};

const getStoreAPI = async () => {
    const res = await axios.get('http://localhost:8080/api/account/getAllStore', {
        withCredentials: true,
    });
    return res.data;
};

const getGuaranteeAPI = async () => {
    const res = await axios.get('http://localhost:8080/api/account/getAllGuarantee', {
        withCredentials: true,
    });
    return res.data;
};

const createProductAPI = async (data) => {
    try {
        const res = await axios.post(
            'http://localhost:8080/api/product/create',
            data, {
                withCredentials: true,
            }
        );
        console.log('create product line', res.data);
        return res.data;
    } catch (error) {
        console.log('error fetch', error);
        return {
            success: false
        };
    }
};

const distributeProductAPI = async (id, data) => {
    try {
        const res = await axios.patch(
            `http://localhost:8080/api/product/distributed/${id}`,
            data, {
                withCredentials: true,
            }
        );
        console.log('distribute product line', res.data);
        return res.data.success;
    } catch (error) {
        console.log('error fetch', error);
        return false;
    }
};

const warrantyProductAPI = async (id, data) => {
    try {
        const res = await axios.patch(
            `http://localhost:8080/api/product/warranty/${id}`,
            data, {
                withCredentials: true,
            }
        );
        console.log('warranty product line', res.data);
        return res.data.success;
    } catch (error) {
        console.log('error fetch', error);
        return false;
    }
};

const deleteProductAPI = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:8080/api/product/${id}`, {
            withCredentials: true,
        });
        console.log('delete product', res.data);
        return res.data.success;
    } catch (error) {
        console.log('error fetch', error);
        return false;
    }
};

export {
    getAllProductLineAPI,
    getStoreAPI,
    getGuaranteeAPI,
    createProductAPI,
    distributeProductAPI,
    warrantyProductAPI,
    deleteProductAPI
}