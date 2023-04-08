"""empty message

Revision ID: f12117ccdfbd
Revises: 0c3cb705ecdf
Create Date: 2023-04-08 02:33:58.339419

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'f12117ccdfbd'
down_revision = '0c3cb705ecdf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('complete_workout', schema=None) as batch_op:
        batch_op.alter_column('exercises',
               existing_type=sa.VARCHAR(),
               type_=postgresql.JSON(astext_type=Text()),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('complete_workout', schema=None) as batch_op:
        batch_op.alter_column('exercises',
               existing_type=postgresql.JSON(astext_type=Text()),
               type_=sa.VARCHAR(),
               existing_nullable=False)

    # ### end Alembic commands ###