'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */

    //  insert users
    await queryInterface.bulkInsert('Users', require('./users.json'))

    const posts = require('./posts.json')

    // insert tags
    const tags = new Set(posts.flatMap((post) => post.tags))

    const uniqueTags = Array.from(tags).map((tag) => ({ key: tag })) // map to get unique tags

    await queryInterface.bulkInsert('Tags', uniqueTags)

    // insert posts
    for (let i = 1; i <= posts.length; i++) {
      // fixed post_id to index
      const post = posts[i - 1]
      await queryInterface.insert(
        queryInterface.sequelize,
        'Posts',
        {
          title: post.title,
          content: post.content,
          postedAt: post.postedAt,
          postedBy: post.postedBy,
        },
        { type: Sequelize.QueryTypes.INSERT }
      )

      // insert Post_tag to relate post and tags
      if (Array.isArray(post?.tags) && post.tags.length > 0) {
        const relationTags = post.tags.map((tag) => ({
          post_id: i,
          tag_id: tag,
        }))
        await queryInterface.bulkInsert('Post_Tag', relationTags)
      }
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('Tags', null, {})
    await queryInterface.bulkDelete('Posts', null, {})
    await queryInterface.bulkDelete('Post_Tag', null, {})
  },
}
