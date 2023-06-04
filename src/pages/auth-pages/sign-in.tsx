import General from './general';
import React from 'react';
import { Paper } from '@mantine/core';
import { TextInput } from '@mantine/core';
import { PasswordInput } from '@mantine/core';
import { Checkbox } from '@mantine/core';
import { Button } from '@mantine/core';
import {
  IconAt,
  IconKey,
  IconKeyframe,
  IconLock,
  IconMail,
  IconUser,
} from '@tabler/icons-react';
import { MantineProvider } from '@mantine/core';

const SignIn = () => {
  return (
    <MantineProvider
      theme={{ colorScheme: 'dark' }}
      withGlobalStyles
      withNormalizeCSS
    >
      <General>
        <Paper p="lg" style={{ paddingTop: 150 }}>
          <p>
            <b style={{ fontSize: 25 }}>Login</b>
          </p>
          <TextInput
            placeholder="E-mail"
            //label="Username"
            //description="filling with your user name"
            //error="wrong information"
            //withAsterisk
            icon={<IconMail size="1rem" />}
          />
          <br />
          <PasswordInput
            //label="Your password"
            placeholder="Password"
            icon={<IconKey size="1rem" />}
          />
          <Button fullWidth mt="xl" size="md">
            Login
          </Button>
        </Paper>
      </General>
    </MantineProvider>
  );
};

export default SignIn;
