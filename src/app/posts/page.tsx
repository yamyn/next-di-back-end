import ApiContainer from "@/modules/index";
import { PlusIcon } from "@radix-ui/react-icons";
import { Box, Container, Grid, IconButton, Table, Text } from "@radix-ui/themes";
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';


export default async function Page() {
  const posts = await ApiContainer.cradle.post.ep.findMany();
  
  return (
      <Container size="3" pt="5">
        <Grid columns="2" gap="9" width="100%" justify="between">
          <Text as="p" size="7" mb="5" >Posts</Text>
          <Grid width="100%" justify="center">
            <IconButton 
                color="grass" 
                variant="soft" 
                style={{ marginLeft: 'auto', cursor: 'pointer' }}>
              <PlusIcon width="18" height="18" />
            </IconButton>
   
          </Grid>
        </Grid>
       
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>id</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Content</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {posts.map(post => {
              return (
                <Table.Row key={post.id}>
                  <Table.RowHeaderCell>{post.id}</Table.RowHeaderCell>
                  <Table.Cell>{post.title}</Table.Cell>
                  <Table.Cell>{post.content}</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root>
      </Container>
  )
}