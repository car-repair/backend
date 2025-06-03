const makeV1 = (route: string) => `${route}`;
const makeAdmin = (route: string) => `admin/${makeV1(route)}`;
// ### ADMIN ROUTES
export namespace AdminRoutes {
    export namespace Booking {
        export const LIST = makeAdmin('booking/list');
        export const GET_ONE = makeAdmin('booking/:id');
        export const CREATE = makeAdmin('booking')
        export const SLOTS = makeAdmin('booking/slots');
    }

    export namespace Car {
        export const LIST = makeAdmin('car/list');
        export const GET_ONE = makeAdmin('car/:id');
        export const CREATE = makeAdmin('car');
    }

    export namespace Brand {
        export const LIST = makeAdmin('brand/list');
        export const GET_ONE = makeAdmin('brand/:id');
        export const CREATE = makeAdmin('brand');
        export namespace Model {
            export const LIST = makeAdmin('brand/:id/model/list');
            export const GET_ONE = makeAdmin('brand/:id/model/:modelId');
            export const CREATE = makeAdmin('brand/:id/model');
        }
    }
    
    export namespace Schedule {
        export const LIST = makeAdmin('schedule/list');
        export const GET_ONE = makeAdmin('schedule/:id');
        export const CREATE = makeAdmin('schedule')
        export namespace Exceptions {
            export const LIST = makeAdmin('schedule/exceptions/list');
            export const GET_ONE = makeAdmin('schedule/exceptions/:id');
            export const CREATE = makeAdmin('schedule/exceptions')
        }
    }

    export namespace Service {
        export const LIST = makeAdmin('service/list');
        export const GET_ONE = makeAdmin('service/:id');
        export const CREATE = makeAdmin('service');
    }
}

// ### PUBLIC ROUTES
export namespace Routes {
    export namespace Booking {
        export const SLOTS = makeV1('booking/slots');
        export const CREATE = makeV1('booking');
    }

    export namespace Car {
        export const LIST = makeV1('car/list');
    }

    export namespace Brand {
        export const LIST = makeV1('brand/list');
        export namespace Model {
            export const LIST = makeV1('brand/:id/model/list');
        }
    }

    export namespace Service {
        export const LIST = makeV1('service/list');
        export const GET_ONE = makeV1('service/:id');
    }
}