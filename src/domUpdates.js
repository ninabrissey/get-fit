const userInfo = document.getElementById('userInfo');

export const displayProfileBox = () => {
  const friendNames = currentUser.friends.reduce((friendList, friendNumber) => {
    let firstName = userRepo.allUsers[friendNumber - 1].getFirstName();
    friendList.push(firstName);
    return friendList;
  }, []);
  let splitAddress = currentUser.address.split(', ');
  let friendsDisplay = friendNames.join(', ');

  userInfo.innerHTML = `
    <div class="user-info-div">
      <h2 class="user-greeting" id="userGreeting">Hi, ${currentUser.getFirstName()}!</h2>
      <p id="address">Address: ${splitAddress[0]}<br>${splitAddress[1]}</p>
      <p id="email">Email: ${currentUser.email}</p>
      <div class="user-spec">
        <img class="mini-icon" src="./images/footsteps-silhouette-variant.png" alt="foot steps">
        <p id="stepGoal">Step Goal: ${currentUser.dailyStepGoal}</p>
      </div>
      <div class="user-spec">
        <img class="mini-icon" src="./images/stride-length.png" alt="foot steps">
        <p id="strideLength">Stride Length: ${currentUser.strideLength}</p>
      </div>
      <div class="user-spec">
        <img class="mini-icon" src="./images/friends.png" alt="friends">
        <p>Friends: ${friendsDisplay}</p>
      </div>
    </div>`;
};
