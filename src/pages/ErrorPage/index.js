import { Grid } from '@mui/material'
import React from 'react'
import Card from '../../components/Card'

export default function ErrorPage({message}) {
    return (
        <Grid
          container
          direction="column"
          alignItems="center"
          style={{ padding: "20px" }}
        >
          <Grid
            item
            container
            style={{
              maxWidth: "1000px",
            }}
          >
            <Card>
              {message}
            </Card>
          </Grid>
        </Grid>
    )
}
