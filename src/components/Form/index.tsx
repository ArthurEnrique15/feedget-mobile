import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import { 
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { captureScreen } from 'react-native-view-shot'

import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Button } from '../Button';
import { ScreenshotButton } from '../ScreenshotButton';
import { FeedbackType } from '../Widget';
import { styles } from './styles';


interface FormProps {
  feedbackType: FeedbackType;
  onFeedbackCancelled: () => void;
  onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCancelled, onFeedbackSent }: FormProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null)

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  function handleScreenshot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    })
    .then(uri => setScreenshot(uri))
    .catch(error => console.log(error))
  }

  function handleScreenshotRemove() {
    setScreenshot(null)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCancelled}>
          <ArrowLeft 
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image}></Image>
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>

      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
      />
      
      <View style={styles.footer}>
        <ScreenshotButton 
          screenshot={screenshot}
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
        />

        <Button 
          isLoading={false}
        />
      </View>

    </View>
  );
}