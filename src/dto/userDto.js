class UserDto {
    constructor(user) {
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.full_name = `${user.first_name} ${user.last_name}`
        this.email = user.email
        this.date_of_birth = user.date_of_birth
        this.password = user.password
    }
}

export default UserDto