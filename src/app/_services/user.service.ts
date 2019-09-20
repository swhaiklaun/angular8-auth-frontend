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

    getById(id) {
        return this.http.get<User>(`${environment.apiUrl}/user/` + id);
    }

    create(user: User) {
        return this.http.post<User>(`${environment.apiUrl}/user`, { user })
            .pipe(map(data => {
                return data;
            }));
    }

    update(user: User) {
        return this.http.put<User>(`${environment.apiUrl}/user`, { user })
        .pipe(map(data => {
            return data;
        }));
    }

    delete(user: User) {
        return this.http.delete<User>(`${environment.apiUrl}/user/` + user.id)
        .pipe(map(data => {
            return data;
        }));
    }
}
