# Launchdarkly LD
You'll need a account LD [Signup](https://app.launchdarkly.com/signup)

## Create a project
In LD platform, go to Account Settings -> Create or Edit a Project to work -> you must check `SDKs using Client-side ID` -> Save Project

## Create a Flag
In LD platform, Select project and environment to work -> Feature Flags -> Create Flag:
 - Name: Throw Error JS
 - Key: throw-error-js
 - check `SDKs using Client-side ID`
  
-> save the flag
## Mandatory environment values
Is neccesary set values in `.env file`:

```bash
#In LD platform, go to Account Settings -> Project where you created the flag -> and copy Client-side ID
LDCLIENTID=[value Client-side ID]
FFLDKEY=[key of flag created in Create a Flag 👆 ]
```