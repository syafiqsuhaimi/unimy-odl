export const FORM_UPDATE = 'form_update';

export const formUpdate = ({ prop, value }) => {
    return {
        type: FORM_UPDATE,
        payload: { prop, value }
    };
};
