import { redirect, useRouter } from "next/navigation";
import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  resendSignUpCode,
  autoSignIn,
  updateUserAttribute,
  type UpdateUserAttributeOutput,
  confirmUserAttribute,
  updatePassword,
  CredentialsAndIdentityIdProvider,
  GetCredentialsOptions,
  CredentialsAndIdentityId,
} from "aws-amplify/auth";
import { getErrorMessage } from "@/utils/get-error-message";
import useUserSession from "@/hooks/use-authuser-token";

export async function handleSignUp(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    console.log(formData.get("email"));
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
      options: {
        userAttributes: {
          email: String(formData.get("email")),
          name: String(formData.get("name")),
        },
        // optional
        autoSignIn: true,
      },
    });
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function handleSendEmailVerificationCode(
  prevState: { message: string; errorMessage: string },
  formData: FormData
) {
  let currentState;
  try {
    await resendSignUpCode({
      username: String(formData.get("email")),
    });
    currentState = {
      ...prevState,
      message: "Code sent successfully",
    };
  } catch (error) {
    currentState = {
      ...prevState,
      errorMessage: getErrorMessage(error),
    };
  }

  return currentState;
}

export async function handleConfirmSignUp(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: String(formData.get("email")),
      confirmationCode: String(formData.get("code")),
    });
    await autoSignIn();
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function handleSignIn(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const { isSignedIn, nextStep } = await signIn({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
    });
    if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
      await resendSignUpCode({
        username: String(formData.get("email")),
      });
    }
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function handleSignOut() {

  try {
    await signOut();
  } catch (error) {
    console.log(getErrorMessage(error));
  }
}

export async function handleUpdateUserAttribute(
  prevState: string,
  formData: FormData
) {
  let attributeKey = "name";
  let attributeValue;
  let currentAttributeValue;

  if (formData.get("email")) {
    attributeKey = "email";
    attributeValue = formData.get("email");
  } else {
    attributeValue = formData.get("name");
  }

  try {
    const output = await updateUserAttribute({
      userAttribute: {
        attributeKey: String(attributeKey),
        value: String(attributeValue),
      },
    });
    return handleUpdateUserAttributeNextSteps(output);
  } catch (error) {
    console.log(error);
    return "error";
  }
}

function handleUpdateUserAttributeNextSteps(output: UpdateUserAttributeOutput) {
  const { nextStep } = output;

  switch (nextStep.updateAttributeStep) {
    case "CONFIRM_ATTRIBUTE_WITH_CODE":
      const codeDeliveryDetails = nextStep.codeDeliveryDetails;
      return `Confirmation code was sent to ${codeDeliveryDetails?.deliveryMedium}.`;
    case "DONE":
      return "success";
  }
}

export async function handleUpdatePassword(
  prevState: "success" | "error" | undefined,
  formData: FormData
) {
  const currentPassword = formData.get("current_password");
  const newPassword = formData.get("new_password");

  try {
    await updatePassword({
      oldPassword: String(currentPassword),
      newPassword: String(newPassword),
    });
  } catch (error) {
    if (error instanceof Error && error.name === "NotAuthorizedException") {
      throw new Error("Incorrect current password");
    }
    // Optionally rethrow other errors if needed
    throw error;
  }
  return "Successfull";
}

export async function handleConfirmUserAttribute(
  prevState: "success" | "error" | undefined,
  formData: FormData
) {
  const code = formData.get("code");

  if (!code) {
    return;
  }

  try {
    await confirmUserAttribute({
      userAttributeKey: "email",
      confirmationCode: String(code),
    });
  } catch (error) {
    console.log(error);
    throw new Error(getErrorMessage(error));
  }

  return "Attribute changed successfully";
}
// idToken: string, userPoolId: string, region: string


// class CustomCredentialsProvider implements CredentialsAndIdentityIdProvider {
//   // Example class member that holds the login information
//   federatedLogin?: {
//     domain: string;
//     token: string;
//   };

//   // Custom method to load the federated login information
//   loadFederatedLogin(login?: typeof this.federatedLogin) {
//     // You may also persist this by caching if needed
//     this.federatedLogin = login;
//   }

//   async getCredentialsAndIdentityId(
//     getCredentialsOptions: GetCredentialsOptions
//   ): Promise<CredentialsAndIdentityId | undefined> {
//     try {
//       // You can add in some validation to check if the token is available before proceeding
//       // You can also refresh the token if it's expired before proceeding

//       const getIdResult = await cognitoidentity.getId({
//         // Get the identityPoolId from config
//         IdentityPoolId: "us-east-2:ccedd3a8-f05a-403f-bef8-ca379761a1a6",
//         Logins: { ["cognito-idp.us-east-2.amazonaws.com/us-east-2_du5BSjsST"]: this.federatedLogin?.token ?? ""},
//       });

//       const cognitoCredentialsResult =
//         await cognitoidentity.getCredentialsForIdentity({
//           IdentityId: getIdResult.IdentityId,
//           Logins: { [this.federatedLogin.domain]: this.federatedLogin.token },
//         });

//       const credentials: CredentialsAndIdentityId = {
//         credentials: {
//           accessKeyId: cognitoCredentialsResult.Credentials?.AccessKeyId,
//           secretAccessKey: cognitoCredentialsResult.Credentials?.SecretKey,
//           sessionToken: cognitoCredentialsResult.Credentials?.SessionToken,
//           expiration: cognitoCredentialsResult.Credentials?.Expiration,
//         },
//         identityId: getIdResult.IdentityId,
//       };
//       return credentials;
//     } catch (e) {
//       console.log("Error getting credentials: ", e);
//     }
//   }
//   // Implement this to clear any cached credentials and identityId. This can be called when signing out of the federation service.
//   clearCredentialsAndIdentityId(): void {}
// }
