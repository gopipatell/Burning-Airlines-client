const User = ( function() {
    let name = "";
    let email = "";
    let user_id = 0;
    let admin = false;

    const getName = function() {

      if (typeof (Storage) !== "undefined") {
        let temp = localStorage.getItem('name');
        if (temp != null) {
          name = temp;
        }
      }

      return name;
    };

    const setName = function(n) {
      if (n!==null) {
        name = n;
        // Also set this in cookie/localStorage
        if (typeof (Storage) !== "undefined") {
          localStorage.setItem('name', name);
        }
      }
    };

    const getEmail= function() {

      if (typeof (Storage) !== "undefined") {
        let temp = localStorage.getItem('email');
        if (temp != null) {
          email = temp;
        }
      }

      return email;    // Or pull this from cookie/localStorage
    };

    const setEmail = function(em) {
      if (em!==null) {
        email = em;
        // Also set this in cookie/localStorage
        if (typeof (Storage) !== "undefined") {
          localStorage.setItem('email', email);
        }
      }
    };

    const getUserId = function() {
      if (typeof (Storage) !== "undefined") {
        let temp = localStorage.getItem('user_id');
        if (temp != null) {
          user_id = temp;
        }
      }
        return user_id;
    };

    const setUserId = function(id) {
        user_id = id;
        // Also set this in cookie/localStorage
        //console.log(user_id);
        if (typeof (Storage) !== "undefined") {
          localStorage.setItem('user_id', user_id);
        }
    };

    const isAdmin = function() {
      if (typeof (Storage) !== "undefined") {
        let temp = localStorage.getItem('admin');
        if (temp != null ) {
          if (temp==="true" || temp === true) {
            admin = true;
          } else {
            admin = false;
          }
        }
      }
        return admin;    // Or pull this from cookie/localStorage
    };

    const setAdmin = function(ad) {
        admin = ad;
        // Also set this in cookie/localStorage
        if (typeof (Storage) !== "undefined") {
          localStorage.setItem('admin', admin);
        }
    };

    return {
      getUserId: getUserId,
      setUserId: setUserId,
      getName: getName,
      setName: setName,
      getEmail: getEmail,
      setEmail: setEmail,
      isAdmin: isAdmin,
      setAdmin: setAdmin
    }

} )();

  export default User;
