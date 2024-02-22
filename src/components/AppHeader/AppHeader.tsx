import { Box, Flex, HStack, IconButton, Link } from '@chakra-ui/react'
import React from 'react'
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'

export interface AppHeaderProps {}
export function AppHeader(props: AppHeaderProps) {
  return (
    <>
      <Flex width="full" justifyContent="space-between" alignItems="center">
        <Box>
          <a
            style={{
              fontSize: '1.5em',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}
            href="/"
          >
            ethtps.info
          </a>
        </Box>
        <Flex>
          <Link href="https://github.com/Mister-Eth/ethtpsinfo">
            <IconButton icon={<FaGithub />} aria-label="github" />
          </Link>
          <Link href="https://twitter.com/ethtps">
            <IconButton
              icon={<FaTwitter href="https://twitter.com/ethtps" />}
              aria-label="twitter"
            />
          </Link>
          <Link href="https://discord.gg/6A4MKDUQzV">
            <IconButton
              icon={<FaDiscord href="https://discord.gg/6A4MKDUQzV" />}
              aria-label="discord"
            />
          </Link>
        </Flex>
      </Flex>
    </>
  )
}
