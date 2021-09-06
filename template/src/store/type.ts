export interface StoreState{
    user: User|Record<string, unknown>;
    isLogin: boolean;
}

/**
 *   'userid' => $user->id,
     'phone' => $user->phone,
     'userName' => $user->name,
     'sessionId' => $sessionId,
 */
export interface User{
    phone: string;
    userName: string;
    sessionId: string;
    userId: string;
}
