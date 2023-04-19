import createRequestsRepository from './requests'
import {useAuthStore} from "@/stores/auth";
export default {

    install: (app) => {
        let authStore = useAuthStore()
        const repositories = {
            sendConfirmationCode:createRequestsRepository(app,'Account/SendConfirmationCodeToEmail',authStore),
            signUp:createRequestsRepository(app,'Account/SignUp',authStore),
            signIn:createRequestsRepository(app,'Account/SignIn',authStore),
            forgetPassword:createRequestsRepository(app,'Account/ForgotPassword',authStore),
            getUserById:createRequestsRepository(app,'Users/Get',authStore),
            updateUser:createRequestsRepository(app,'User/Update',authStore),
            getAllOrders:createRequestsRepository(app,'Order/GetAll',authStore),
            getAllOrderByUserId:createRequestsRepository(app,'Order/GetByUserId',authStore),
            createOrder:createRequestsRepository(app,'Order/Create',authStore),
            getAllUsers:createRequestsRepository(app,'Users/GetAll',authStore),
            changeOrderStatus:createRequestsRepository(app,'Order/ChangeOrderStatus',authStore),
            getCryptoAccountsByUserId:createRequestsRepository(app,'CryptoAccount/GetByUserId',authStore),
            createCryptoAccount:createRequestsRepository(app,'CryptoAccount/Create',authStore),
            updateCryptoAccount:createRequestsRepository(app,'CryptoAccount/Update',authStore),
            deleteCryptoAccount:createRequestsRepository(app,'CryptoAccount/Delete',authStore)

        }
        app.provide('repositories', repositories)
    }
}