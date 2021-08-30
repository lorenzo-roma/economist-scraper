import AuthServiceCached from "../../src/service/auth-service-cached.ts/service";
import User from "../../src/model/user";
import AuthResult from "../../src/model/auth-result";

let serviceTested: AuthServiceCached;

beforeEach(() => {
    serviceTested = new AuthServiceCached();
});

describe("Login tests", () => {
    test('Login with not existent user yield to not found',async()=>{
        const user: User = {username: "Test", password: "Test"};
        const result: AuthResult = await serviceTested.logIn(user);
        expect(result).toBe(AuthResult.NOT_FOUND);
    });
    
    test('Login with wrong password yield to wrong password result', async () => {
        const user: User = {username: "Test", password: "Test"};
        await serviceTested.signUp(user);
        const userWithWrongPassword = {username:"Test", password:"abcdef"};
        const result: AuthResult = await serviceTested.logIn(userWithWrongPassword);
        expect(result).toBe(AuthResult.WRONG_PASSWORD);
    });
    
    test('Login correct yield to success', async ()=>{
        const user: User = {username: "Test", password: "Test"};
        await serviceTested.signUp(user);
        const result: AuthResult = await serviceTested.logIn(user);
        expect(result).toBe(AuthResult.SUCCESS);
    });
});

describe("Signup tests", () =>{

    test('Signup user already registered yield to already registered result', async () => {
        const user: User = {username: "Test", password: "Test"};
        await serviceTested.signUp(user);
        const result: AuthResult = await serviceTested.signUp(user);
        expect(result).toBe(AuthResult.ALREADY_SIGN_UP);
    });
    
    test('Signup correct yield to success', async ()=>{
        const user: User = {username: "Test", password: "Test"};
        const result: AuthResult = await serviceTested.signUp(user);
        expect(result).toBe(AuthResult.SUCCESS);
    });
})

describe("Token tests", ()=>{

    test("Hashing is invertible", ()=>{
        const user: User = {username: "Test", password: "Test"};
        const token: string = serviceTested.getToken(user);
        const newUser : User = serviceTested.verifyToken(token);
        expect(user).toStrictEqual(newUser);
    })

})
