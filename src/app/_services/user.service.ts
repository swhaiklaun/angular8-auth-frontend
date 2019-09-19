import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/user`);
    }

    save(user: User) {
        return this.http.post<any>(`${environment.apiUrl}/user`, { user })
            .pipe(map(user => {
                // console.log(user);
                return user;
            }));
    }
}
