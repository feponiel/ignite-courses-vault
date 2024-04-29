import { AboutItem, AboutList, ProfileContainer, ProfileInfo } from './styles'
import { followersFormatter } from '../../../../utils/formatter'
import { useEffect, useState } from 'react'
import axios from 'axios'

export function Profile() {
  const [userInfo, setUserInfo] = useState<any>({})

  const setGithubUser = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/feponiel`,
      )

      setUserInfo(await response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setGithubUser()
  }, [])

  return (
    <ProfileContainer>
      <img src={userInfo.avatar_url} alt="" />

      <ProfileInfo>
        <header>
          <h1>{userInfo.name}</h1>
          <a
            href={'https://github.com/' + userInfo.login}
            target="_blank"
            rel="noreferrer"
          >
            <span>Github</span>
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </header>

        <p>{userInfo.bio}</p>

        <AboutList>
          <AboutItem>
            <i className="fa-brands fa-github"></i>
            <span>{userInfo.login}</span>
          </AboutItem>

          {userInfo.company && (
            <AboutItem>
              <i className="fa-solid fa-building"></i>
              <span>{userInfo.company}</span>
            </AboutItem>
          )}

          <AboutItem>
            <i className="fa-solid fa-user-group"></i>
            <span>
              {followersFormatter.format(userInfo.followers).toLowerCase()}{' '}
              followers
            </span>
          </AboutItem>
        </AboutList>
      </ProfileInfo>
    </ProfileContainer>
  )
}
