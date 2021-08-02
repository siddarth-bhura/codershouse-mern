// DTO - Data Transform Object - Basically we are removing unwanted data to be sent from server to client
class UserDto {
    id;
    phone;
    activated;
    createdAt;

    constructor(user){
        this.id = user._id;
        this.phone = user.phone;
        this.activated = user.activated;
        this.createdAt = user.createdAt;
    }
}

module.exports = UserDto;