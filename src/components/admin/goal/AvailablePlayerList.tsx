import { Formik, Form } from 'formik'
import SelectInput from '../../form/SelectInput'
import { addGoalValidator } from '../../../validators/addGoalValidator'
import Input from '../../ui/Input'
import Button from '../../ui/Button'

interface AvailablePlayersListProps {
  availablePlayers: { value: string; label: string }[]

  submitHandler: (values: { playerId: string; goalCount: number }, { resetForm }: { resetForm: () => void }) => void
  saveGoalHandler: () => void
}

function AvailablePlayersList({ availablePlayers, submitHandler, saveGoalHandler }: AvailablePlayersListProps) {
  return (
    <Formik
      initialValues={{
        playerId: '',
        goalCount: 1
      }}
      onSubmit={submitHandler}
      validationSchema={addGoalValidator}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form className="space-y-4">
          <div className="grid items-start grid-cols-4 gap-4 pb-3 ">
            <div className="col-span-3">
              <SelectInput
                key={availablePlayers.length}
                label="Scorer"
                name="playerId"
                options={availablePlayers}
                placeholder="Select scorer!"
                setFieldValue={setFieldValue}
                error={touched.playerId && errors.playerId ? errors.playerId : false}
                value={availablePlayers.find(option => option.value === values.playerId) || null}
              />
            </div>
            <div className="col-span-1 ">
              <Input
                type="number"
                name="goalCount"
                min={1}
                label="Count"
                className="text-sm "
                error={touched.goalCount && errors.goalCount ? errors.goalCount : false}
              />
            </div>
          </div>

          <div className="grid grid-flow-col mx-1 ">
            <div className="col-span-2">
              <Button
                type="button"
                label="Save Goals"
                className="block mb-6 text-white bg-primary w-fit"
                onClick={saveGoalHandler}
              />
            </div>

            <div className="col-span-6">
              <Button
                type="submit"
                label="Add Goal"
                className="block w-full mb-6 bg-secondary"
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default AvailablePlayersList
